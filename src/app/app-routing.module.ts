import { AuthComponent } from './pages/auth/auth.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { QuizInstructionsComponent } from './pages/quiz-instructions/quiz-instructions.component';
import { QuizPlayComponent } from './pages/quiz-play/quiz-play.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './core/guards/authGuard';
import { ThankComponent } from './pages/thank/thank.component';
import { DocReaderComponent } from './pages/doc-reader/doc-reader.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryProductsComponent } from './pages/product/category-products/category-products.component';
import { PDPComponent } from './pages/product/pdp/pdp.component';
import { NewPdpComponent } from './pages/product/new-pdp/new-pdp.component';


const routes: Routes = [
  // { path: '', component: CourseListComponent },
  // { path: '', redirectTo:'products', pathMatch:'full' },
  { path: "", component: ProductComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'instructions/:quizId', component: QuizInstructionsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'reset-password/:token', loadChildren: () => import('./pages/reset/reset.module').then(m => m.ResetModule) },
  { path: 'quiz-play/:quizId', component: QuizPlayComponent, canActivate: [AuthGuard] },
  { path: 'order-confirm', component: ThankComponent },
  { path: 'doc-reader/:doc_id', component: DocReaderComponent },
  { path: 'learn', loadChildren: () => import('./pages/course-play/course-play.module').then(m => m.CoursePlayModule) },
  { path: ":category", component: CategoryProductsComponent },
  { path: ":category/:product_id", component: NewPdpComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 10], // cool option, or ideal option when you have a fixed header on top.
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
