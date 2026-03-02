import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeDetailDialogComponent } from './commande-detail-dialog.component';

describe('CommandeDetailDialogComponent', () => {
  let component: CommandeDetailDialogComponent;
  let fixture: ComponentFixture<CommandeDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
