---
title: "General"
sidebar_position: 1
---


:::tip[💡 Web dev tip: a shared convention is documentation you don't have to write]
Consistent naming, indentation and structure across a codebase let any contributor predict where
something lives and how it's written before they even open the file — the opposite of every file
inventing its own style. This is exactly why coding standards exist: they turn "ask the original
author" into "read the convention once." [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)
:::

The framework was built following some rules to ensure compatibility between components and to provide an easier way for developers to work together. Here are some starting rules to keep in mind:

- The code should work on **php 5.2.4**, like [WordPress Minimum Requirements](http://wordpress.org/about/requirements/) says. Don't use php 5.3+ features, because some hosting providers don't have php 5.3+ installed on the servers.

- Follow [WordPress Coding Standards](http://make.wordpress.org/core/handbook/coding-standards/).

  > > [!NOTE]
  > > If you already have some code written with spaces indentation (that does not follow [WordPress Coding Standards](http://make.wordpress.org/core/handbook/coding-standards/)), use this [RegExp](http://en.wikipedia.org/wiki/Regular_expression) to replace spaces with tabs:
  > >
  > > `(?<=^\s*) {4}` replace with `\t`
