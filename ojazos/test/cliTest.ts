import test from 'ava'

test('identify', async t => {
  // const r = execSync('node bin/magica --input test/assets/n.png --command "identify n.png"')
  t.true(true)
})

// test('convert should generate files in local dir by default', async t => {
//   if (existsSync('tmp_cli_2.gif')) {
//     unlinkSync('tmp_cli_2.gif')
//   }
//   execSync('node bin/magica --input test/assets/n.png --command "convert n.png -scale 144% tmp_cli_2.gif"')
//   t.deepEqual(fileType(readFileSync('tmp_cli_2.gif')), { ext: 'gif', mime: 'image/gif' })
// })

// test.todo('should accept several input images')
// test.todo('should mkdir-p if output dir doesnt exists')
