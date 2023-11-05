let globalAudio: HTMLAudioElement | null = null;

export function playAudioFromUrl(audioUrl: string): number {
  if (globalAudio) {
    // Pausar o áudio global se ele existir
    globalAudio.pause();
  }

  const audio = new Audio(audioUrl);

  audio.addEventListener('canplaythrough', () => {
    audio.play();
    const durationSeconds = audio.duration; // Obtenha a duração em segundos
    console.log(`Duração da música: ${durationSeconds} segundos`);
  });

  audio.addEventListener('ended', () => {
    // O áudio terminou de tocar
    console.log('O áudio terminou de tocar');
  });

  audio.addEventListener('error', (e) => {
    // Lidar com quaisquer erros que possam ocorrer durante a reprodução
    console.error('Ocorreu um erro ao reproduzir o áudio:', e);
  });

  // Definir o áudio como o áudio global
  globalAudio = audio;

  return audio.duration; // Retorne a duração em segundos
}



export function getMP3Duration(mp3Url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'metadata';

    audio.addEventListener('loadedmetadata', () => {
      const duration = audio.duration;
      audio.remove(); // Limpar o elemento de áudio

      resolve(duration);
    });

    audio.addEventListener('error', (e) => {
      reject(e);
    });

    audio.src = mp3Url; // Carregar o arquivo MP3

    // Iniciar o carregamento do áudio
    audio.load();
  });
}
export function formatSecondsToMinutes(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00'; // Valor inválido, retornar formato padrão
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}