import { SOUND_PATHS } from "./heroAssistantData";

type SoundName = keyof typeof SOUND_PATHS;

export class CookitoAudio {
  private sounds: Record<SoundName, HTMLAudioElement>;
  private typingTimer: number | null = null;
  private muted: boolean;

  constructor(muted = false) {
    this.muted = muted;
    this.sounds = {
      send: this.createAudio(SOUND_PATHS.send, 0.22),
      receive: this.createAudio(SOUND_PATHS.receive, 0.22),
      typing: this.createAudio(SOUND_PATHS.typing, 0.08),
    };
  }

  private createAudio(path: string, volume: number) {
    const audio = new Audio(path);
    audio.preload = "auto";
    audio.volume = volume;
    return audio;
  }

  unlock() {
    for (const audio of Object.values(this.sounds)) {
      audio.load();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;

    if (muted) {
      this.stopTyping();
    }
  }

  isMuted() {
    return this.muted;
  }

  private play(name: SoundName) {
    if (this.muted) return;

    const audio = this.sounds[name];

    try {
      audio.pause();
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    } catch {
      // Algunos navegadores pueden bloquear sonido sin interacción.
    }
  }

  playSend() {
    this.play("send");
  }

  playReceive() {
    this.play("receive");
  }

  startTyping() {
    this.stopTyping();
    if (this.muted) return;

    this.play("typing");
    this.typingTimer = window.setInterval(() => {
      this.play("typing");
    }, 720);
  }

  stopTyping() {
    if (this.typingTimer !== null) {
      window.clearInterval(this.typingTimer);
      this.typingTimer = null;
    }

    this.sounds.typing.pause();
    this.sounds.typing.currentTime = 0;
  }
}
