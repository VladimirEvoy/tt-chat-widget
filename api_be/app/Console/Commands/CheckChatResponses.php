<?php

namespace App\Console\Commands;

use App\Contracts\Services\MessageServiceInterface;
use App\Enums\MessageType;
use App\Enums\SenderType;
use App\Models\Bot;
use App\Models\Chat;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckChatResponses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:check-responses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check not been answered chats created in the last 10m and send a message';

    public function __construct(private readonly MessageServiceInterface $messageService)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $now = Carbon::now();

        // TODO Case: WHEN WE HAVE FEW MILLION MESSAGES IN 10m
        // Action: NEED TO CHANGE THIS QUERY TO SQL, whereDoesntHave WILL AFFECT ON PERFORMANCE
        // SQL QUERY EXAMPLE: $chats = DB::select('SELECT * FROM chats WHERE id NOT IN (SELECT chat_id FROM messages WHERE sender_type = ? OR type = ?) AND created_at >= ?', [User::class, MessageType::BOT, now()->subMinutes(10)]);
        $chats = Chat::where('created_at', '>=', $now->subMinutes(120))
            ->whereDoesntHave('messages', function ($query) {
                $query->where('sender_type', User::class)
                    ->orWhere('type', MessageType::BOT);
            })
            ->get();

        foreach ($chats as $chat) {
            // Case: outside of working hours
            if ($now->hour < Bot::START_WORK_HOUR || $now->hour > Bot::END_WORK_HOUR) {
                $this->sendMessage($chat->id,Bot::OUT_OF_WORK_HOURS);
                continue;
            }

            $this->sendMessage($chat->id,Bot::PLEASE_WAIT);
        }
    }

    protected function sendMessage(int $chatId, string $message): void
    {
        $this->messageService
            ->setSenderType(SenderType::USER->value)
            ->setType(MessageType::BOT->value)
            ->create($chatId, User::first()->id, $message);
    }
}
