import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportModule } from './viewport/viewport.module';
import { Viewport3DComponent } from "./viewport/viewport3-d/viewport3d.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewportModule, Viewport3DComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'drawing-companion';
}
