import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdateFeature, Feature , CreateStory} from '../feature/feature.component';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {

  editing: boolean = false;
  constructor() { }

  @Output() updated = new EventEmitter<UpdateFeature>();
  @Output() deleted = new EventEmitter<UpdateFeature>();
  @Output() newStory = new EventEmitter<CreateStory>();

  @Input() feature: UpdateFeature;

  private stories: string[]=[];

  edit(): void {
    this.editing = true;
  }

  addStory(): void {
    let story : CreateStory = {
      Story : "Add story here",
      StoryPoints: 1,
      FeatureId: this.feature.Id
    }
    this.newStory.emit(story);
  }

  save(): void {
    this.editing = false;
    console.log(this.feature.Name);
    this.updated.emit(this.feature);
  }

  delete(): void {
    this.deleted.emit(this.feature);
  }

  ngOnInit() {
  }

}
