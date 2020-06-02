import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule
  ]
})
export class AngularMaterialModule { }
