import { Table } from '@/components/Table';
import { addFood, getFood } from '@/service/food';
import { MutationKey, QueryKey } from '@/service/food/key';
import { FoodItem, GetFoodItemRequest } from '@/service/food/types';
import { useIsFetching, useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import styles from './styles.module.css';
import { getColumns } from './components/columns';

function Supabase() {
  const queryClient = useQueryClient();

  const isFetching = useIsFetching() > 0;
  const isMutating = useIsMutating() > 0;
  const disabled = isFetching || isMutating;

  const searchIdRef = useRef<HTMLInputElement>(null);
  const searchNameRef = useRef<HTMLInputElement>(null);
  const addFoodRef = useRef<HTMLInputElement>(null);

  const getFoodRequest: GetFoodItemRequest = {
    id: searchIdRef.current?.value ? { value: searchIdRef.current.value, type: 'eq' } : undefined,
    name: searchNameRef.current?.value ? { value: searchNameRef.current.value, type: 'eq' } : undefined,
    order: {
      type: 'asc',
      value: 'created_at',
    },
  };

  const { data: foodListData } = useQuery({
    queryKey: [QueryKey.FOOD, getFoodRequest],
    queryFn: getFood,
  });

  const addFoodMutation = useMutation({
    mutationKey: [MutationKey.ADD_FOOD],
    mutationFn: addFood,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.FOOD] });
    },
  });

  function onAddFood() {
    if (addFoodRef.current?.value) {
      addFoodMutation.mutate({ name: addFoodRef.current.value });
    }
  }

  async function onSearchFood() {
    await queryClient.invalidateQueries({ queryKey: [QueryKey.FOOD] });
  }

  return (
    <div className={styles.container}>
      {/* Add */}
      <div className={styles.actionBar}>
        <input id="add_food" placeholder="add.." ref={addFoodRef} disabled={disabled} />
        <button onClick={onAddFood} disabled={disabled}>
          Add
        </button>
      </div>

      {/* Search field */}
      <div className={styles.actionBar}>
        <input id="search_id" placeholder="id.." ref={searchIdRef} />
        <input id="search_name" placeholder="name.." ref={searchNameRef} disabled={disabled} />
        <button onClick={onSearchFood} disabled={disabled}>
          Search
        </button>
      </div>

      {/* DataTable */}
      <Table<FoodItem> data={foodListData} columns={getColumns()} />
    </div>
  );
}

export default Supabase;
