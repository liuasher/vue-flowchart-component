'use strict'

import WorkArea from '../lib/components/workarea'
import {InPort, OutPort} from '../lib/components/port'
import {Path, CurvePath} from '../lib/components/path'
import Node from '../lib/components/node'
import Common from '../lib/components/node/common'
import Initial from '../lib/components/node/initial'
import NodeModel from '../lib/components/nodemodel'
import Menu from '../lib/components/menu/menu'
import store from '../lib/store'
import nodemix from '../lib/mixins/node'

const views = {
  TaskWorkArea: WorkArea,
  TaskInPort: InPort,
  TaskOutPort: OutPort,
  TaskCommonNode: Common,
  TaskInitialNode: Initial,
  TaskNode: Node,
  TaskPath: Path,
  TaskMenu: Menu,
  TaskCurvePath: CurvePath,
  TaskNodeModel: NodeModel
}

const install = function (Vue, opts = {}) {
  Object.keys(views).forEach(key => {
    Vue.component(key, views[key])
  })
}

export const TaskNode = install
export const TaskNodeStore = store
export const NodeMix = nodemix
