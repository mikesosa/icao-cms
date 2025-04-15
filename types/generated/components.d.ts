import type { Schema, Struct } from '@strapi/strapi';

export interface ActivityActivity extends Struct.ComponentSchema {
  collectionName: 'components_activity_activity';
  info: {
    description: 'A learning activity with various types of interactions';
    displayName: 'Activity';
  };
  attributes: {
    correctAnswer: Schema.Attribute.JSON & Schema.Attribute.Required;
    feedback: Schema.Attribute.RichText & Schema.Attribute.Required;
    media: Schema.Attribute.Media<'images' | 'audios'>;
    options: Schema.Attribute.JSON;
    prompt: Schema.Attribute.RichText & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['mcq', 'audio_input', 'text_input']> &
      Schema.Attribute.Required;
  };
}

export interface ContentBlockContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_block_content_block';
  info: {
    description: 'A block of content that can be text, video, image, or audio';
    displayName: 'Content Block';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    media: Schema.Attribute.Media<'images' | 'videos' | 'audios'>;
    order: Schema.Attribute.Integer & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['text', 'video', 'image', 'audio']> &
      Schema.Attribute.Required;
  };
}

export interface ModuleModule extends Struct.ComponentSchema {
  collectionName: 'components_module_module';
  info: {
    description: 'A module containing units and learning content';
    displayName: 'Module';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    moduleType: Schema.Attribute.Enumeration<['core', 'oral', 'sim']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    units: Schema.Attribute.Component<'unit.unit', true>;
  };
}

export interface SimulationStepSimulationStep extends Struct.ComponentSchema {
  collectionName: 'components_simulation_step_simulation_step';
  info: {
    description: 'A step in an interactive simulation';
    displayName: 'Simulation Step';
  };
  attributes: {
    inputType: Schema.Attribute.Enumeration<['audio', 'text', 'mcq']> &
      Schema.Attribute.Required;
    prompt: Schema.Attribute.RichText & Schema.Attribute.Required;
    validationLogic: Schema.Attribute.JSON;
  };
}

export interface UnitUnit extends Struct.ComponentSchema {
  collectionName: 'components_unit_unit';
  info: {
    description: 'A unit containing content blocks and optional practice/simulation';
    displayName: 'Unit';
  };
  attributes: {
    contentBlocks: Schema.Attribute.Component<
      'content-block.content-block',
      true
    >;
    practice: Schema.Attribute.Relation<
      'oneToOne',
      'api::practice-set.practice-set'
    >;
    simulation: Schema.Attribute.Relation<
      'oneToOne',
      'api::simulation.simulation'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'activity.activity': ActivityActivity;
      'content-block.content-block': ContentBlockContentBlock;
      'module.module': ModuleModule;
      'simulation-step.simulation-step': SimulationStepSimulationStep;
      'unit.unit': UnitUnit;
    }
  }
}
