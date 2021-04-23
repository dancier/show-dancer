import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profile.service";
import { Profile } from "./profile/profile";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "show-dancer";

  profile: Profile = { id: "foo", name: "bar" };

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.get();
  }

  get() {
    this.profileService.get().subscribe((profile) => (this.profile = profile));
  }
}
