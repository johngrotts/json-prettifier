import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPrettifierComponent } from "./common/json-prettifier/json-prettifier.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPrettifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'json-prettify';
}
