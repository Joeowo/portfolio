#!/usr/bin/env node

/**
 * my-impeccable Context Loader
 * 加载 Portfolio 项目的 spec 和设计文档
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 默认路径
const DEFAULT_SPEC_DIR = 'docs/spec'
const DEFAULT_DESIGN_DIR = 'docs/design'

// Phase 映射到设计文档
const PHASE_DESIGN_MAP = {
  '3': 'phase-3-auth.md',
  '4': 'phase-4-assets-library.md',
  '5': 'phase-5-work-editor.md',
  '6': 'phase-6-templates.md',
  '7': 'phase-7-pages-management.md',
  '8': 'phase-8-admin.md'
}

/**
 * 查找文件（支持多路径）
 */
function findFile(basePaths, filename) {
  for (const basePath of basePaths) {
    const filePath = path.resolve(basePath, filename)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  return null
}

/**
 * 读取文件内容
 */
function readFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return null
  }
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return null
  }
}

/**
 * 解析 phase 编号
 */
function parsePhase(arg) {
  if (!arg) return null
  const match = arg.match(/phase\s*(\d+)/i)
  return match ? match[1] : null
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2)
  const cwd = process.cwd()

  // 解析参数
  let phase = null
  let specDir = DEFAULT_SPEC_DIR
  let designPath = null

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const parsedPhase = parsePhase(arg)
    if (parsedPhase) {
      phase = parsedPhase
    } else if (arg.includes('spec')) {
      specDir = arg
    } else if (arg.includes('design') || arg.endsWith('.md')) {
      designPath = arg
    }
  }

  // 搜索路径优先级
  const searchPaths = [
    cwd,
    path.join(cwd, 'docs'),
    path.join(cwd, '.agents'),
    path.join(cwd, '.claude')
  ]

  // 加载 spec 文档
  const specPath = findFile(searchPaths, path.join(specDir, 'spec.md'))
  const tasksPath = findFile(searchPaths, path.join(specDir, 'tasks.md'))

  // 加载设计文档
  let designDocPath = designPath
  if (phase && !designPath && PHASE_DESIGN_MAP[phase]) {
    designDocPath = findFile(searchPaths, path.join(DEFAULT_DESIGN_DIR, PHASE_DESIGN_MAP[phase]))
  }

  const specContent = readFile(specPath)
  const tasksContent = readFile(tasksPath)
  const designContent = designDocPath ? readFile(designDocPath) : null

  // 构建输出
  const output = {
    phase,
    paths: {
      cwd,
      specDir: specDir,
      designDir: DEFAULT_DESIGN_DIR,
      specFile: specPath,
      tasksFile: tasksPath,
      designFile: designDocPath
    },
    documents: {
      spec: specContent ? {
        path: specPath,
        content: specContent
      } : null,
      tasks: tasksContent ? {
        path: tasksPath,
        content: tasksContent
      } : null,
      design: designContent ? {
        path: designDocPath,
        content: designContent
      } : null
    }
  }

  // 输出 JSON
  console.log(JSON.stringify(output, null, 2))
}

main()
