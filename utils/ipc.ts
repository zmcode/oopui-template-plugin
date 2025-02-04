import { IpcEmitter, IpcListener } from '@electron-toolkit/typed-ipc/renderer'
const emitter = new IpcEmitter()
const listener = new IpcListener()

export async function ipcInvoke(channel: string, ...args: any[]) {
  try {
    return emitter.invoke<string>(channel as string, ...(args as any[]))
  }
  catch (error) {
    console.error('Failed to invoke IPC event:', error)
  }
}

export function ipcSend(channel: string, ...args: any[]) {
  try {
    emitter.send<string>(channel, ...(args as any[]))
  }
  catch (error) {
    console.error('Failed to invoke IPC event:', error)
  }
}

export function ipcOn(channel: string, fn: any) {
  try {
    listener.on<string>(channel, fn)
  }
  catch (error) {
    console.error('Failed to invoke IPC event:', error)
  }
}
