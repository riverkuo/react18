import { editFood } from '@/service/food';
import { MutationKey, QueryKey } from '@/service/food/key';
import { FoodItem } from '@/service/food/types';
import { useIsFetching, useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

export function NameCell(props: { value?: string | undefined; originValue?: FoodItem | undefined }) {
  const { value, originValue } = props;
  const queryClient = useQueryClient();
  const editFoodRef = useRef<HTMLInputElement>(null);
  const [editMode, toggleEditMode] = useState(false);
  const isFetching = useIsFetching() > 0;
  const isMutating = useIsMutating() > 0;
  const disabled = isFetching || isMutating;

  const editFoodMutation = useMutation({
    mutationKey: [MutationKey.EDIT_FOOD],
    mutationFn: editFood,
    onSuccess: async () => {
      toggleEditMode(false);
      await queryClient.invalidateQueries({ queryKey: [QueryKey.FOOD] });
    },
  });

  function onEdit() {
    if (editMode) {
      if (editFoodRef.current?.value) {
        if (originValue?.id) {
          editFoodMutation.mutate({
            params: { id: { value: originValue?.id, type: 'eq' } },
            body: { name: editFoodRef.current.value },
          });
        }
      }
    } else {
      toggleEditMode(true);
    }
  }

  return (
    <div className="displayFlex">
      <input id={originValue?.id} ref={editFoodRef} defaultValue={value} disabled={disabled || !editMode} />
      <button disabled={disabled} onClick={onEdit}>
        {editMode ? 'submit' : 'edit'}
      </button>
    </div>
  );
}
