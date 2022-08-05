import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { UsersComponent } from './components/pages/users/users.component';
import { NewUserComponent } from './components/pages/users/new-user/new-user.component';
import { UpdateUserComponent } from './components/pages/users/update-user/update-user.component';

// Pipe
import { UsersFilterPipe } from '../app/pipes/users-filter.pipe';

// ngrx Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../app/store/effects/user.effects';

// Angular Meterials
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    UsersComponent,
    UsersFilterPipe,
    NewUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
