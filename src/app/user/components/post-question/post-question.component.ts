import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { FormBuilder, FormsModule, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router'; // Import the Router
import { QuestionService } from '../../user-services/question-service/question.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-question',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule

  ],
  templateUrl: './post-question.component.html',
  styleUrl: './post-question.component.scss'
})
export class PostQuestionComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  tags: any[] = [];
  filteredTags!: Observable<string[]>;
  allTags: string[] = ['code', 'java', 'compiler'];
  postQuestionForm!: FormGroup;

  announcer = inject(LiveAnnouncer);

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  // validateform: any;

  constructor(
    private router: Router, 
    private service: QuestionService, 
    private fb: FormBuilder, 
    private sb: MatSnackBar
  ){
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
    this.postQuestionForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }
  //code for tags functionality
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }



  onPostQuestion(): void {
    console.log(this.postQuestionForm.value);
    this.service.postQuestion(this.postQuestionForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.sb.open("Question posted successfully", "Close", { duration: 5000 });
  
        // Reset form values and clear tags array
        this.postQuestionForm.reset();
        this.tags = [];
      } else {
        this.sb.open("Something went wrong", "Close", { duration: 5000 });
      }
    });
  }
  
}
