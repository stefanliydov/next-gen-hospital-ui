import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITestResult } from 'src/app/shared/model/ITestResult';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent {

  @Input() testResult: ITestResult;
  constructor(private router: Router,
    private userService: UserService) { }

  showMore() {
    this.router.navigateByUrl(`test-result/details/${this.testResult.id}`);
  }

  redoTest() {
    this.router.navigateByUrl(`run-test/${this.testResult.id}`);
  }

  isPhysician(): boolean {
    return this.userService.isPhysician();
  }

}
