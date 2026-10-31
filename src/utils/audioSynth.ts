// Web Audio API ambient Egyptian sound and interaction effects
class EgyptianAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play a soft mystical Egyptian sistrum/flute chime
  public playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pentatonic ancient Egyptian scale frequency (D note ~ 587.33Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  // Play ceremonial gong/drum for victories and quiz success
  public playCeremony() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [146.83, 220.0, 293.66, 440.0].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);

        gain.gain.setValueAtTime(0.15, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 1.6);
      });
    } catch (e) {
      console.warn('Audio ceremony error:', e);
    }
  }

  // Subtle ambient harmonic drone (Nile meditation tone)
  private startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    try {
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      masterGain.connect(this.ctx.destination);
      this.gainNode = masterGain;

      // Ancient harmonic drone chords: D2, A2, D3
      const freqs = [73.42, 110.0, 146.83];
      freqs.forEach(f => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);

        osc.start();
        this.ambientOscillators.push(osc);
      });
    } catch (e) {
      console.warn('Ambient start error:', e);
    }
  }

  private stopAmbient() {
    this.ambientOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.ambientOscillators = [];
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {
        // ignore
      }
      this.gainNode = null;
    }
  }
}

export const audioService = new EgyptianAudioService();
