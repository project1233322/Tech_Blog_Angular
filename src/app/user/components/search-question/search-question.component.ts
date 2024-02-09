import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-question',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,  ReactiveFormsModule,CommonModule,MatCardModule,MatIconModule,MatChipsModule,MatPaginatorModule,MatInputModule,MatButtonModule ],
  templateUrl: './search-question.component.html',
  styleUrl: './search-question.component.scss'
})
export class SearchQuestionComponent {

  titleForm!: FormGroup;
  pageNumber:number=0;
  questions: any[]=[];
  total!: number;
constructor(private questionService:QuestionService,private fb:FormBuilder){}

ngOnInit(){
this.titleForm=this.fb.group({
  title:[null,Validators.required] 
})
}


searchQuestionByTitle(){
  console.log(this.titleForm.value)
  this.questionService.searchQuestionByTitle(this.titleForm.controls['title']!.value,this.pageNumber).subscribe((res)=>{
    console.log(res);

    this.questions= res.questionDTOs;
    this.total = res.totalPages*5;
  })

}
pageIndexChange(event: any) {

  this.pageNumber = event.pageIndex;
  
}


}
