import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { TopbarLayoutComponent } from './components/layouts/topbar-layout/topbar-layout.component';
import { SidebarLayoutComponent } from './components/layouts/sidebar-layout/sidebar-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    NotFoundComponent,
    CartComponent,
    ContactUsComponent,
    AboutComponent,
    TopbarLayoutComponent,
    SidebarLayoutComponent,
    SidebarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
