import { Component, OnInit, ViewChild, HostBinding, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

export class MemberEditComponent implements OnInit {
  photoUrl: string;
  user: User;
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private router: ActivatedRoute, private alerify: AlertifyService, private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data => { this.user = data['user']; });
    this.authService.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }

  updateUser(id: number, user: User) {
    console.log(this.user);
    return this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alerify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => { this.alerify.error(error); }
    );

  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
