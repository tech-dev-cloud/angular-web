import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { ComponentsModule } from './components/components.module';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { QuizPlayComponent } from './pages/quiz-play/quiz-play.component';
import { QuizInstructionsComponent } from './pages/quiz-instructions/quiz-instructions.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ThankComponent } from './pages/thank/thank.component';
import { AppService } from './core/services/app.service';
import { ProductService } from './core/services/product.service';
import { DocReaderComponent } from './pages/doc-reader/doc-reader.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryProductsComponent } from './pages/product/category-products/category-products.component';
import { PDPComponent } from './pages/product/pdp/pdp.component';
import { NewPdpComponent } from './pages/product/new-pdp/new-pdp.component';
import { RatingModalComponent } from './modals/rating-modal/rating-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    QuizPlayComponent,
    QuizInstructionsComponent,
    ProductDetailComponent,
    AuthComponent,
    ProfileComponent,
    ThankComponent,
    DocReaderComponent,
    ProductComponent,
    CategoryProductsComponent,
    PDPComponent,
    NewPdpComponent,
    RatingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],

  entryComponents: [AuthComponent, RatingModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    NgbActiveModal,
    AppService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
