import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ILecture } from "src/app/core/services/product.service";

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
    @Input() video_url: string;
    @Input() contents: any;
    show = true;
    constructor(
        private activeModal: NgbActiveModal
    ) { }
    onClickLecture(lecture: ILecture) {
        this.show = true;
        this.video_url = `https://player.vimeo.com${lecture.url}`
    }
    videoLoaded() {
        this.show = false;
    }
    closeModal() {
        this.activeModal.close();
    }
}