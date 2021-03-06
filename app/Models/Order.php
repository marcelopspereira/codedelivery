<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Order extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'client_id',
        'user_deliveryman_id',
        'total',
        'status',
        'cupom_id',
        'geo',
        'service',
        'defect',
        'number_os_sise'
    ];

    public function items(){
        return $this->hasMany(OrderItem::class);
    }

    public function auxiliaryItem(){
        return $this->hasMany(AuxiliaryItems::class);
    }

    public function deliveryman(){
        return $this->belongsTo(User::class,'user_deliveryman_id','id');
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function cupom(){
        return $this->belongsTo(Cupom::class);
    }

    public function product(){
        return $this->hasMany(Product::class);
    }

    public function auxiliary(){
        return $this->hasMany(Auxuliary::class);
    }

}
