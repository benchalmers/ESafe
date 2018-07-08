import { Component, OnInit, Input } from '@angular/core';
import {CreateStory} from '../feature/feature.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() story: CreateStory;

  editing:boolean =false;
  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.editing=true;
  }

  save() {
    this.editing=false;
  }

}
