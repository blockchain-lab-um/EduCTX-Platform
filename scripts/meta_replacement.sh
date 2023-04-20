#!/bin/bash

cat build/index.html | sed -e 's/<meta property="og:image" content="\/eductx_meta.png"\/>/<meta property="og:image" content="\/concordia_logo.png"\/>/;s/<meta property="og:title" content="Check my new Digital Micro Credential at EduCTX Platform"\/>/<meta property="og:title" content="Check my new Digital Micro Credential issued by Concordia - EduCTX Platform"\/>/;s/<meta property="og:description" content="EduCTX Platform verify page"\/>/<meta property="og:description" content="EduCTX Platform verify page"\/>/' > build/concordia.html