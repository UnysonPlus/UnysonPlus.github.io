---
title: "General"
sidebar_position: 1
---


The framework was built following some rules to ensure compatibility between components and to provide an easier way for developers to work together. Here are some starting rules to keep in mind:

- The code should work on **php 5.2.4**, like [WordPress Minimum Requirements](http://wordpress.org/about/requirements/) says. Don't use php 5.3+ features, because some hosting providers don't have php 5.3+ installed on the servers.

- Follow [WordPress Coding Standards](http://make.wordpress.org/core/handbook/coding-standards/).

  > > [!NOTE]
  > > If you already have some code written with spaces indentation (that does not follow [WordPress Coding Standards](http://make.wordpress.org/core/handbook/coding-standards/)), use this [RegExp](http://en.wikipedia.org/wiki/Regular_expression) to replace spaces with tabs:
  > >
  > > `(?<=^\s*) {4}` replace with `\t`
