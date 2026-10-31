import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../model/item';
import { ConvertService, PropKind } from '../../service/convert.service';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [FormsModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly convertService = inject(ConvertService);
  private readonly translate = inject(TranslateService);

  // --- UI texts ---
  readonly selectFromPlaceholder = toSignal(
    this.translate.get('select_from_placeholder'),
    { initialValue: '' }
  );
  readonly selectToPlaceholder = toSignal(
    this.translate.get('select_to_placeholder'),
    { initialValue: '' }
  );

  // --- Data source (follows the selected language) ---
  readonly items = toSignal(this.convertService.getItems(), {
    initialValue: [] as readonly Item[],
  });

  // --- Selections ---
  readonly quantity = signal(1);
  readonly fromId = signal<number | null>(null);
  readonly toId = signal<number | null>(null);
  readonly property = signal<PropKind | null>(null);

  readonly firstElement = computed(() => this.findItem(this.fromId()));
  readonly secondElement = computed(() => this.findItem(this.toId()));

  // --- Result ---
  readonly finalResult = computed(() => {
    const from = this.fromId();
    const to = this.toId();
    const property = this.property();
    if (from == null || to == null || property == null) return 0;
    return this.convertService.compareItems(
      from,
      to,
      property,
      this.quantity()
    );
  });

  updateQuantity(next: number | string | null): void {
    this.quantity.set(Number(next) || 0);
  }

  private findItem(id: number | null): Item | null {
    if (id == null) return null;
    return this.items().find((item) => item.id === id) ?? null;
  }
}
