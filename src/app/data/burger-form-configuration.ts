import { BunType } from './bun-type.enum';
import { BurgerType } from './burger-type.enum';
import { DegreeOfDoneness } from './degree-of-doneness.enum';
import { SelectableOption } from './selectable-option';
import { ToppingType } from './topping-type.enum';

export class BurgerFormConfiguration {
  bunOptions: Array<SelectableOption>;
  burgerTypeOptions: Array<SelectableOption>;
  burgerDegreeOfDonenessOptions: Array<SelectableOption>;
  toppingOptions: Array<SelectableOption>;
}

export class BurgerFormConfigurationBuilder {
  private configuration: BurgerFormConfiguration;

  static new(): BurgerFormConfigurationBuilder {
    return new BurgerFormConfigurationBuilder();
  }

  private constructor() {
    this.configuration = new BurgerFormConfiguration();
  }

  public setBunOptions(
    bunOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.bunOptions = bunOptions;
    return this;
  }

  public setBurgerTypeOptions(
    burgerTypeOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.burgerTypeOptions = burgerTypeOptions;
    return this;
  }

  public setBurgerDegreeOfDonenessOptions(
    burgerDegreeOfDonenessOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.burgerDegreeOfDonenessOptions =
      burgerDegreeOfDonenessOptions;
    return this;
  }

  public setToppingOptions(
    toppingOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.toppingOptions = toppingOptions;
    return this;
  }

  public build(): BurgerFormConfiguration {
    this.validate();
    return this.configuration;
  }

  private validate(): void {
    if (!this.configuration.bunOptions) {
      throw new Error('Bun options are required!');
    }
    if (!this.configuration.burgerTypeOptions) {
      throw new Error('Burger type options are required!');
    }
    if (!this.configuration.burgerDegreeOfDonenessOptions) {
      throw new Error('Burger degree of doneness options are required!');
    }
    if (!this.configuration.toppingOptions) {
      throw new Error('Topping options are required!');
    }
  }
}

export function loadDefaultBurgerFormConfiguration(): BurgerFormConfiguration {
  const bunTypeOptions = [
    SelectableOption.of(BunType.PLAIN, 'Plain'),
    SelectableOption.of(BunType.SESAME_SEED, 'Sesame seed'),
    SelectableOption.of(BunType.POTATO, 'Potato'),
  ];

  const burgerTypeOptions = [
    SelectableOption.of(BurgerType.BEEF, 'Beef'),
    SelectableOption.of(BurgerType.BEEF_ANGUS, 'Beef angus'),
    SelectableOption.of(BurgerType.VEGGIE, 'Veggie'),
  ];

  const burgerDegreeOfDonenessOptions = [
    SelectableOption.of(DegreeOfDoneness.RARE, 'Rare'),
    SelectableOption.of(DegreeOfDoneness.MEDIUM_RARE, 'Medium rare'),
    SelectableOption.of(DegreeOfDoneness.MEDIUM, 'Medium'),
    SelectableOption.of(DegreeOfDoneness.MEDIUM_WELL, 'Medium well'),
    SelectableOption.of(DegreeOfDoneness.WELL, 'Well'),
  ];

  const toppingOptions = [
    SelectableOption.of(ToppingType.BACON, 'Bacon'),
    SelectableOption.of(ToppingType.CHEDDAR, 'Cheddar'),
    SelectableOption.of(ToppingType.BBQ, 'BBQ'),
    SelectableOption.of(ToppingType.JALAPENO, 'Jalapeno'),
    SelectableOption.of(ToppingType.CARAMELIZED_ONION, 'Caramelized onion'),
    SelectableOption.of(ToppingType.HUMMUS, 'Hummus'),
  ];

  return BurgerFormConfigurationBuilder.new()
    .setBunOptions(bunTypeOptions)
    .setBurgerTypeOptions(burgerTypeOptions)
    .setBurgerDegreeOfDonenessOptions(burgerDegreeOfDonenessOptions)
    .setToppingOptions(toppingOptions)
    .build();
}
