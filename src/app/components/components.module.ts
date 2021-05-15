import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { QuestionStatusPipe } from './../core/pipe/question-status.pipe';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopScrollComponent } from './top-scroll/top-scroll.component';
import { ListComponent } from './list/list.component';
import { LoaderComponent } from './loader/loader.component';
import { CardComponent } from './card/card.component';
import { ProductCrouselComponent } from './product-crousel/product-crousel.component';
import { OwlModule } from 'ngx-owl-carousel';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SafePipe } from '../core/pipe/safe.pipe';
import { CommentComponent } from './comment/comment.component';
import { ImagenamePipe, LectureDuration } from '../core/pipe/imagename.pipe';
import { RatingBoxComponent } from './rating-box/rating-box.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TopScrollComponent,
    ButtonComponent,
    QuestionStatusPipe,
    ListComponent,
    LoaderComponent,
    CardComponent,
    ProductCrouselComponent,
    VideoPlayerComponent,
    SafePipe,
    CommentComponent,
    ImagenamePipe,
    LectureDuration,
    RatingBoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OwlModule,
    LazyLoadImageModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  exports: [
    LazyLoadImageModule,
    HeaderComponent,
    FooterComponent,
    TopScrollComponent,
    RouterModule,
    ButtonComponent,
    HttpClientModule,
    NgbModule,
    QuestionStatusPipe,
    ListComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    ProductCrouselComponent,
    CardComponent,
    PdfViewerModule,
    VideoPlayerComponent,
    SafePipe,
    ImagenamePipe,
    CommentComponent,
    LectureDuration,
    RatingBoxComponent
  ]
})
export class ComponentsModule { }
