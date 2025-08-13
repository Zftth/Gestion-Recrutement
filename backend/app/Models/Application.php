<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_offer_id',
        'candidate_id',
        'status',
        'notes'
    ];

    public function jobOffer()
    {
        return $this->belongsTo(JobOffer::class);
    }

    public function candidate()
    {
        return $this->belongsTo(User::class, 'candidate_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }
}
