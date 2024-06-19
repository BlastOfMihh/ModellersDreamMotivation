import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { EngineService } from './model-display'; 
import { Input } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ServerUrls } from '../urls';

@Component({
  selector: 'app-view-model',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <div class="engine-wrapper">
      <canvas #rendererCanvas id="renderCanvas"></canvas>
    </div>
  `
})
export class ViewModelComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  @Input()
  contest_id:number

  engServ=inject(EngineService)

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();

    let givenModel=ServerUrls.base+'/model/1'
    const loader = new GLTFLoader();
    loader.load(givenModel, (gltf) => {
      this.engServ.addToScene(gltf.scene);
    }, undefined, function (error) {
      // console.error(error);
    });
  }

}