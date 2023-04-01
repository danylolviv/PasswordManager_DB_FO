import { Component } from '@angular/core';
import {PasswordManagerService} from "./Service/password-manager.service";
import {PasswordUnitModel} from "../auth/Model/PasswordUnitModel";
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-manager',
  templateUrl: './password-manager.component.html',
  styleUrls: ['./password-manager.component.scss']
})
export class PasswordManagerComponent {
  units: PasswordUnitModel[] = [];
  showPage: any = false;
  newUnit: PasswordUnitModel = { username: 'none', MasterPassword:  "none", website: '', webpageUsername: '', password: '' };

  res: any;
  website: string | undefined;
  username: string | undefined;
  password: string | undefined;
  MasterPassword: string | undefined;
  webpageUsername: string | undefined;
  constructor(private unitService: PasswordManagerService, private router: Router) {}

  ngOnInit() {
    //this.getUnits();
    let token =  localStorage.getItem('token');
    if(token == "1"){
      this.showPage = true
    }else{
      this.showPage = false
    }

    console.log("manager: ", this.showPage);
    this.timerForLogout();
  }


  timerForLogout(){
    setTimeout(() => {
        this.logout();
    }, 600000); //sign out after 10 min
}

  showUnits(){
    this.getUnits();
  }

  hideUnits(){
    location.reload();
  }


  getUnits(): void {
    let usernameFromLocal =  localStorage.getItem('username');
    let passewordFromLocal =  localStorage.getItem('password');
    let newUnit = { MasterPassword: passewordFromLocal|| "none", username: usernameFromLocal|| "none", website:"none", webpageUsername:"none", password:"none"};
    
    
    this.unitService.getUnits(newUnit)
      .subscribe(createdUnit => {
        console.log("createdUnit", createdUnit);
        console.log("userinfo", createdUnit)
        this.res = createdUnit;
        this.units.push(createdUnit);
      });

  }

  addUnit() {
    //this.units.push(this.newUnit);

    console.log("M user: ", this.webpageUsername);
    console.log("M site: ", this.website);
    console.log("M passeord: ", this.password);
    this.newUnit = { username: "none", MasterPassword: "none", website: this.website || "none", webpageUsername: this.webpageUsername || "none", password: this.password || "none" };
    this.units.push(this.newUnit);
    this.createUnit();
    //this.clearUnit()
    //this.website = '';
    //this.username = '';
    //this.newUnit = { website: '', username: '', password: '' };
    
  }
  clearUnit() {
    this.website = '';
    this.username = '';
    this.webpageUsername = '';
    this.password = '';
    this.newUnit = { MasterPassword: "none", website: '', username: 'none', webpageUsername: '', password: '' };
  }

  createUnit(): void {
    let usernameFromLocal =  localStorage.getItem('username');
    let passewordFromLocal =  localStorage.getItem('password');
    const unit: PasswordUnitModel = { username: usernameFromLocal|| "none", MasterPassword: passewordFromLocal || "none", website: this.website || "none", webpageUsername: this.webpageUsername || "none", password: this.password || "none" }; //materpassword: this.MasterPassword || "none"
    
    this.unitService.createUnit(unit)
      .subscribe(createdUnit => {
        
        this.units.push(createdUnit);
      });
  }


 logout(){
  localStorage.removeItem("token");
  this.router.navigateByUrl('/login');
  }

  editUnit(unitFromHtml: PasswordUnitModel): void {
    let usernameFromLocal =  localStorage.getItem('username');
    let passewordFromLocal =  localStorage.getItem('password');
    console.log("edit", this.password)

    const unit: PasswordUnitModel = { id:unitFromHtml.id, username: usernameFromLocal|| "none", MasterPassword: passewordFromLocal || "none", website: unitFromHtml.website || "none", webpageUsername: unitFromHtml.webpageUsername || "none", password: unitFromHtml.password || "none" }; //materpassword: this.MasterPassword || "none"
  
    
    this.unitService.createUnit(unit)
      .subscribe(createdUnit => {
        
        this.units.push(createdUnit);
      });

    //reload the page to get new list
    this.router.navigateByUrl('/main');
  }

  deleteUnit(unit: PasswordUnitModel): void {
    console.log("delete", unit.id);


    this.unitService.deleteUniT(unit).subscribe();

    //reload the page to get new list
    location.reload();
    //this.router.navigateByUrl('/main');
    

    //this.units = this.units.filter(u => u !== unit);

  }

  generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    //this.newUnit.password = password;
    this.password = password;

    
  }
}
