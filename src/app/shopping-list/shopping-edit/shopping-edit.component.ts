import { ShoppingListService } from '../shopping-list.service';


import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit,} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe((index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
      })
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

}
