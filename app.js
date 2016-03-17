/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */


var express 	= require('express'),
	app 				= express(),
	core				= require('./config/express_core');

core(express, app);
