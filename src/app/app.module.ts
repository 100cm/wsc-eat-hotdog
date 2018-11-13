import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PointBonusComponent } from './point-bonus/point-bonus.component';
import { PointContainerComponent } from './point-container/point-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PointBonusComponent,
    PointContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents:[
    PointBonusComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
