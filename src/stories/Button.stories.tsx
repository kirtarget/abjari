import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from './button.component';
import { ButtonBaseProps } from './button.component';



export default {
	title: 'Button',
	component: Button,
} as ComponentMeta<typeof Button>;

const Template = (args: any) => <Button {...args} />

export const Primary = Template.bind({})
