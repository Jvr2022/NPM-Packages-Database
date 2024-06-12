var datarev = require('../lib/datarev')
  , testutil = require('testutil')

describe('datarev', function() {
  describe('+ ctor()', function() {
    it('should work', function() {
      var data = {
        name: "JP",
        strength: 1000
      }

      var newdata = datarev(data)

      T (newdata.createdAt > new Date(0).toISOString())
      T (newdata.updatedAt > new Date(0).toISOString())
      EQ (Object.keys(newdata.revisions).length, 0)

      EQ (newdata.original.name, "JP")
      EQ (newdata.current.name, "JP")
      EQ (newdata.original.strength, 1000)
      EQ (newdata.current.strength, 1000)
    })
  })

  describe('- rev', function() {
    describe('> when object sub object has changed', function() {
      it('should show the revisions', function() {
        var person = {
          name: {
            first: "JP",
            last: "Richardson"
          },
          strength: 500
        }

        var personRev = datarev(person)

        EQ (personRev.original.name.first, "JP")
        EQ (personRev.original.name.last, "Richardson")
        EQ (personRev.original.strength, 500)

        EQ (personRev.current.name.first, "JP")
        EQ (personRev.current.name.last, "Richardson")
        EQ (personRev.current.strength, 500)

        person.name.first = "Chris"
        person.strength = 750
        personRev.rev(person)

        EQ (personRev.original.name.first, "JP")
        EQ (personRev.original.name.last, "Richardson")
        EQ (personRev.original.strength, 500)

        EQ (personRev.current.name.first, "Chris")
        EQ (personRev.current.name.last, "Richardson")
        EQ (personRev.current.strength, 750)
        
        EQ (Object.keys(personRev.revisions).length, 1)

        var rev1 = personRev.revisions[personRev.updatedAt]
        EQ (rev1.length, 2)

        EQ (rev1[0].p, ".name.first")
        EQ (rev1[0].old, "JP")
        EQ (rev1[0].val, "Chris")
        EQ (rev1[0].m, 'R')

        EQ (rev1[1].p, ".strength")
        EQ (rev1[1].old, 500)
        EQ (rev1[1].val, 750)
        EQ (rev1[1].m, 'R')

        person.name.middle = "Jon"
        personRev.rev(person)

        var rev2 = personRev.revisions[personRev.updatedAt]
        EQ (rev2.length, 1)

        EQ (rev2[0].p, ".name.middle")
        EQ (rev2[0].val, "Jon")
        EQ (rev2[0].m, '+')  

        delete person.name.first
        personRev.rev(person)

        var rev3 = personRev.revisions[personRev.updatedAt]
        EQ (rev3.length, 1)

        EQ (rev3[0].p, ".name.first")
        EQ (rev3[0].val, "Chris")
        EQ (rev3[0].m, '-')  

      })
    })
  })
})
