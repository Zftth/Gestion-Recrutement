<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationSubmitted extends Notification
{
    use Queueable;

    public function __construct(public $jobTitle) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Nouvelle candidature soumise')
                    ->line('Votre candidature pour le poste de "' . $this->jobTitle . '" a été soumise avec succès.')
                    ->action('Voir mes candidatures', url('/applications'))
                    ->line('Merci d’utiliser notre plateforme !');
    }
}
