#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';

const BRANCH_TYPES = {
  feature: 'feature',
  bugfix: 'bugfix',
  hotfix: 'hotfix',
  release: 'release',
  chore: 'chore'
};

const BRANCH_DESCRIPTIONS = {
  [BRANCH_TYPES.feature]: '新功能開發',
  [BRANCH_TYPES.bugfix]: '修復 bug',
  [BRANCH_TYPES.hotfix]: '緊急修復',
  [BRANCH_TYPES.release]: '發布版本',
  [BRANCH_TYPES.chore]: '非程式碼任務 (如更新依賴、文件等)'
};

const validateBranchName = (input) => {

  switch (true) {
    case !/^[a-z0-9-]+$/.test(input):
      return '分支名稱只能包含小寫字母、數字和連字符';
    case input.includes('--'):
      return '不允許連續的連字符';
    case input.endsWith('-'):
      return '不允許結尾是連字符';
    default:
      return true;
  }
};


const createBranchName = (type, ticketNumber, description) => {
  if (type === BRANCH_TYPES.release) {
    return `${type}/v${description}`;
  }
  return ticketNumber 
    ? `${type}/${ticketNumber}-${description}`
    : `${type}/${description}`;
};

async function promptBranchType() {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '選擇分支類型:',
      choices: Object.entries(BRANCH_TYPES).map(([key, value]) => ({
        name: `${value} (${BRANCH_DESCRIPTIONS[key]})`,
        value: key
      }))
    }
  ]);
  return type;
}

async function promptTicketNumber() {
  const { needTicket } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'needTicket',
      message: '是否需要包含 ticket 編號?',
      default: true
    }
  ]);

  if (!needTicket) return null;

  const { ticketNumber } = await inquirer.prompt([
    {
      type: 'input',
      name: 'ticketNumber',
      message: '請輸入 ticket 編號 (例如: ABC-123):',
      validate: (input) => {
        if (!/^[A-Z]+-\d+$/.test(input)) {
          return '請輸入有效的 ticket 編號格式 (例如: ABC-123)';
        }
        return true;
      }
    }
  ]);
  return ticketNumber;
}

async function promptDescription(type) {
  const message = type === BRANCH_TYPES.release
    ? '請輸入版本號 (例如: 1.0.0):'
    : '請輸入簡短描述 (用 - 連接單字):';

  const { description } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message,
      validate: (input) => {
        if (type === BRANCH_TYPES.release) {
          return /^\d+\.\d+\.\d+$/.test(input)
            ? true
            : '請輸入有效的版本號格式 (例如: 1.0.0)';
        }
        return validateBranchName(input);
      }
    }
  ]);
  return description;
}

async function createBranch() {
  try {
    const type = await promptBranchType();

    const ticketNumber = await promptTicketNumber();

    const description = await promptDescription(type);

    const branchName = createBranchName(type, ticketNumber, description);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `將創建分支: ${branchName}\n確認創建?`,
        default: true
      }
    ]);

    if (!confirm) {
      console.log('已取消創建分支');
      return;
    }

    execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
    console.log(`\n✅ 分支 ${branchName} 創建成功！`);

  } catch (error) {
    console.error(`\n❌ 錯誤: ${error.message}`);
    process.exit(1);
  }
}

createBranch(); 