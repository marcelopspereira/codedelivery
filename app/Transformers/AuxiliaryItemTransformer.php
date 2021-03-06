<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\AuxuliaryItems;

/**
 * Class AuxiliaryItemTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class AuxiliaryItemTransformer extends TransformerAbstract
{

    /**
     * Transform the \AuxiliaryItem entity
     * @param \AuxiliaryItem $model
     *
     * @return array
     */
    public function transform(AuxuliaryItems $model)
    {
        return [
            'id'         => (int) $model->id,
            'auxiliary_id'  => (int) $model->auxiliary_id,
            'order_id'      => (int) $model->order_id,

                /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
    public function includeAuxiliary(AuxuliaryItems $model){
        return $this->item($model->auxiliary, new AuxiliaryItemTransformer());
    }
}
