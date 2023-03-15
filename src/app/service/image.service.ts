import { Injectable } from '@angular/core';
import {Item} from '../interface/item';
import {ITEM_SPRITE_SIZE} from '../ingredients/ingredients.component';
import {OutputDisplay} from '../interface/output-display';
import {CraftingTable} from '../interface/crafting-table';
import {SKILL_SPRITE_SIZE, TABLE_SPRITE_SIZE} from '../skills/skills.component';
import {Skill} from '../interface/skill';
import {environment} from '../../environments/environment';

export const LARGE_ITEM_SPRITE_SIZE = 128;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //Images pulled directly from GitHub repository to save bandwidth for hosted site
  public imageBaseUrl: string;
  public imageTemplateUrl: string;

  constructor() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.imageTemplateUrl = this.imageBaseUrl + '32px-template.png';
  }

  getSpriteImageUrl(nameID: string, imageFile: string): string {
    if (nameID.localeCompare('LightBulbItem') === 0) {
      return this.imageBaseUrl + 'lightbulb.png';
    } else {
      return this.imageBaseUrl + imageFile;
    }
  }

  getProfitSpriteImageUrl(): string {
    return this.imageBaseUrl + 'UI_Icons_00.png';
  }

  getCalorieSpriteImageUrl(): string {
    return this.imageBaseUrl + 'UI_Icons_00.png';
  }

  getSpritePosition(itemNameID: string, xPos: number, yPos: number, size: number): string {
    if (itemNameID.localeCompare('LightBulbItem') === 0) {
      return '0px 0px'
    }
    return `-${xPos * size}px -${yPos * size}px`;
  }

  getSpriteBackgroundSize(itemNameID: string, imageFile: string): string {
    if (itemNameID.localeCompare('LightBulbItem') === 0) {
      return '32px'
    } else if ('UI_Icons_Baked_0.png'.localeCompare(imageFile) === 0) {
      return '2048px';
    } else if ('skill-icons-sprite.png'.localeCompare(imageFile) === 0) {
      return '256px';
    }
    return '512px';
  }

  getLargeSpriteBackgroundSize(itemNameID: string, imageFile: string): string {
    return `${parseInt(this.getSpriteBackgroundSize(itemNameID, imageFile)) * 4}px`
  }

  getSpriteCssFilter(filter: string): string {
    return (filter != undefined ? filter : '');
  }

  getImgStyle(nameID: string, imageFile: string, xPos: number, yPos: number, size: number, filter: string): any {
    return {
      'background': `url(${this.getSpriteImageUrl(nameID, imageFile)}) ${this.getSpritePosition(nameID, xPos, yPos, size)} /
      ${this.getSpriteBackgroundSize(nameID, imageFile)} no-repeat`,
      'filter': `${this.getSpriteCssFilter(filter)}`
    }
  }

  getLargeImgStyle(nameID: string, imageFile: string, xPos: number, yPos: number, size: number, filter: string): any {
    return {
      'background': `url(${this.getSpriteImageUrl(nameID, imageFile)}) ${this.getSpritePosition(nameID, xPos, yPos, size)} /
      ${this.getLargeSpriteBackgroundSize(nameID, imageFile)} no-repeat`,
      'filter': `${this.getSpriteCssFilter(filter)}`
    }
  }

  getProfitImgStyle(): any {
    return {
      'background': `url(${this.getProfitSpriteImageUrl()}) -320px -384px / 512px no-repeat`
    }
  }

  getCalorieImgStyle(): any {
    return {
      'background': `url(${this.getCalorieSpriteImageUrl()}) -416px -160px / 512px no-repeat`
    }
  }

  getItemImgStyle(item: Item): any {
    return this.getImgStyle(item.nameID, item.imageFile, item.xPos, item.yPos, ITEM_SPRITE_SIZE, item.filter);
  }

  getOutputImgStyle(output: OutputDisplay): any {
    return this.getImgStyle(output.itemNameID, output.imageFile, output.xPos, output.yPos, ITEM_SPRITE_SIZE, output.filter);
  }

  getTableImgStyle(table: CraftingTable): any {
    return this.getImgStyle(table.nameID, table.imageFile, table.xPos, table.yPos, TABLE_SPRITE_SIZE, null);
  }

  getSkillImgStyle(skill: Skill): any {
    return this.getImgStyle(skill.nameID, skill.imageFile, skill.xPos, skill.yPos, SKILL_SPRITE_SIZE, null);
  }

  getLargeItemImgStyle(item: Item): any {
    return this.getLargeImgStyle(item.nameID, item.imageFile, item.xPos, item.yPos, LARGE_ITEM_SPRITE_SIZE, item.filter);
  }
}
