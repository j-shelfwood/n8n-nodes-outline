import { OutlineApi } from './credentials/OutlineApi.credentials';
import { Outline } from './nodes/Outline/Outline.node';
import { OutlineWebhook } from './nodes/OutlineWebhook/OutlineWebhook.node';

export const credentials = [OutlineApi];

export const nodes = [Outline, OutlineWebhook];
