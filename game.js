const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You awake and see an egg in front of you...',
    options: [
      {
        text: 'Take the egg',
        setState: { egg: true },
        nextText: 2
      },
      {
        text: 'Leave the egg',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You go forth and come acrossed the wealth merchant who desperatly wants the egg',
    options: [
      {
        text: 'Trade the egg for an enchanted wand',
        requiredState: (currentState) => currentState.egg,
        setState: { egg: false, wand: true },
        nextText: 3
      },
      {
        text: 'Trade the Egg for a heroic sword',
        requiredState: (currentState) => currentState.egg,
        setState: { egg: false, sword: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant, you come acrossed a haunted mansion and start to feel drained',
    options: [
      {
        text: 'Explore the mansion',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at',
        nextText: 5
      },
      {
        text: 'Sleep in the barn',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You immediatly pass out in the mansion and are taken over by a ghost!',
    options: [
      {
        text: 'Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You realised you have not even a shilling, so you decide to break into someones home and are caught by a passin guard!',
    options: [
      {
        text: 'Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby mansion.',
    options: [
      {
        text: 'Explore the mansion',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the mansion a ghost suddenly appears!',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your Wand',
        requiredState: (currentState) => currentState.wand,
        nextText: 9
      },
      {
        text: 'Hide behind your Sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 10
      },
      {
        text: 'Throw the egg at it',
        requiredState: (currentState) => currentState.egg,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You try to run but the ghost swiftly takes over your body in an instant',
    options: [
      {
        text: 'Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'The wand immediatly brok when you tried to cast a spell! Greedy merchant...',
    options: [
      {
        text: 'Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The sword fell apart as you unsheathed it, greedy merchant...',
    options: [
      {
        text: 'Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Suddenly the egg hatches to reveal one of the ghost busters! he clears out the mansion and you sold it for 10 billion shillings!.',
    options: [
      {
        text: 'YOU WON! Again?',
        nextText: -1
      }
    ]
  }
]

startGame()