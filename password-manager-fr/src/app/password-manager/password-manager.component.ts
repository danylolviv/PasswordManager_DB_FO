import { Component } from '@angular/core';
import {PasswordManagerService} from "./Service/password-manager.service";
import {PasswordUnitModel} from "../auth/Model/PasswordUnitModel";

@Component({
  selector: 'app-password-manager',
  templateUrl: './password-manager.component.html',
  styleUrls: ['./password-manager.component.scss']
})
export class PasswordManagerComponent {
  units: PasswordUnitModel[] = [];

  newUnit: PasswordUnitModel = { website: '', username: '', password: '' };


  constructor(private unitService: PasswordManagerService) {}

  ngOnInit() {
    this.getUnits();
  }

  getUnits(): void {
    this.unitService.getUnits()
      .subscribe(units => this.units = units);
  }

  addUnit() {
    this.units.push(this.newUnit);
    this.newUnit = { website: '', username: '', password: '' };
  }

  createUnit(): void {
    const unit: PasswordUnitModel = { id: '', website: '', username: '', password: '' };
    this.unitService.createUnit(unit)
      .subscribe(createdUnit => {
        this.units.push(createdUnit);
      });
  }

  editUnit(unit: PasswordUnitModel): void {
    // implement edit logic
  }

  deleteUnit(unit: PasswordUnitModel): void {
    this.units = this.units.filter(u => u !== unit);
    //this.unitService.deleteUnit(unit.id).subscribe();
  }

  generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    this.newUnit.password = password;
  }
}
