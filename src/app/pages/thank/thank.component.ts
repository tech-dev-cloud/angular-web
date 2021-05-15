import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thank',
  templateUrl: './thank.component.html',
  styleUrls: ['./thank.component.scss']
})
export class ThankComponent implements OnInit {
  payment_request_id:string;
  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res=>{
      console.log(res);
      
      this.payment_request_id=res.payment_request_id
    })
  }
  profile(){
    this.router.navigateByUrl('/profile')
  }

}
