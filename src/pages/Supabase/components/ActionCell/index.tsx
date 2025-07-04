import { deleteFood } from '@/service/food';
import { MutationKey, QueryKey } from '@/service/food/key';
import { FoodItem } from '@/service/food/types';
import { useIsFetching, useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';

export function ActionCell(props: { originValue?: FoodItem | undefined }) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching() > 0;
  const isMutating = useIsMutating() > 0;
  const disabled = isFetching || isMutating;
  function onDeleteFood() {
    if (props?.originValue?.id) deleteFoodMutation.mutate({ id: { value: props?.originValue?.id, type: 'eq' } });
  }

  const deleteFoodMutation = useMutation({
    mutationKey: [MutationKey.DELETE_FOOD],
    mutationFn: deleteFood,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.FOOD] });
    },
  });

  return (
    <button disabled={disabled} onClick={onDeleteFood}>
      delete
    </button>
  );
}
