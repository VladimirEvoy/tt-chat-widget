import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export const configureSocket = ({ key, wsHost, wsPort, reverbSchema }) => {
  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'reverb',
    key,
    wsHost: wsHost,
    wsPort: wsPort,
    wssPort: wsPort,
    forceTLS: (reverbSchema ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
  })
}
