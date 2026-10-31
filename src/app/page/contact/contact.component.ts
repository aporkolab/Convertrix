import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';

export const CONTACT_TEXT = ` contact_info.md
				            [Entry mode; press Ctrl+D to save and quit; press Ctrl+C to quit without saving]
				
				            ### The programmer of this application is Ádám Dr. Porkoláb.
                    You can contact him by his webpage:  https://www.adamporkolab.hu
				
				            - The GitHub page of the author: https://github.com/APorkolab/`;

/** Delay before the typewriter starts, in ms. */
export const TYPE_START_DELAY = 1800;
/** Delay between two typed characters, in ms. */
export const TYPE_SPEED = 60;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setTimeout> | undefined;

  /** The part of the contact text typed out so far. */
  readonly typed = signal('');

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.timer));
  }

  ngOnInit(): void {
    // setup typewriter effect in the terminal demo
    this.timer = setTimeout(() => this.typeNext(), TYPE_START_DELAY);
  }

  private typeNext(): void {
    const length = this.typed().length;
    if (length >= CONTACT_TEXT.length) return;
    this.typed.set(CONTACT_TEXT.slice(0, length + 1));
    this.timer = setTimeout(() => this.typeNext(), TYPE_SPEED);
  }
}
