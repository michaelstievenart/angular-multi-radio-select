import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MultiRadioSelectModule } from './multi-radio-select/multi-radio-select.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MultiRadioSelectModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
