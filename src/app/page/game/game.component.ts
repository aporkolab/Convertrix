import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../../model/item';
import { ConvertService, PropKind } from '../../service/convert.service';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnChanges {
  // --- Input ---
  @Input() quantity = 1;

  // --- UI texts ---
  selectFromPlaceholder$ = this.translate.get('select_from_placeholder');
  selectToPlaceholder$ = this.translate.get('select_to_placeholder');

  // --- Data source ---
  listOfAllCard$: Observable<readonly Item[]> = of([]);

  // --- Selections (the template refers to them) ---
  firstElement: Item | null = null;
  secondElement: Item | null = null;
  property: PropKind | null = null;

  // --- Internal IDs for calculation ---
  private _fromId: number | null = null;
  private _toId: number | null = null;

  // --- Result ---
  private _finalResult = 0;
  get finalResult(): number {
    return this._finalResult;
  }

  constructor(
    private readonly convertService: ConvertService,
    private readonly translate: TranslateService
  ) {}

  // ---- Lifecycle ----
  ngOnInit(): void {
    this.listOfAllCard$ = this.convertService.getItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('quantity' in changes) this.recompute();
  }

  // ---- Public methods called by the template ----
  setFrom(id: number | null): void {
    this._fromId = id;
    this.recompute();
  }

  setTo(id: number | null): void {
    this._toId = id;
    this.recompute();
  }

  updateQuantity(next: number): void {
    this.quantity = Number(next) || 0;
    this.recompute();
  }

  // It is public because it is referenced by the template
  recompute(): void {
    if (this._fromId == null || this._toId == null || this.property == null) {
      this._finalResult = 0;
      return;
    }
    this._finalResult = this.convertService.compareItems(
      this._fromId,
      this._toId,
      this.property,
      this.quantity
    );

    // Refresh description
    if (this._fromId) {
      this.convertService.getItem(this._fromId).subscribe((it) => {
        if (this.firstElement) this.firstElement.description = it!.description;
      });
    }
    if (this._toId) {
      this.convertService.getItem(this._toId).subscribe((it) => {
        if (this.secondElement)
          this.secondElement.description = it!.description;
      });
    }
  }
}
